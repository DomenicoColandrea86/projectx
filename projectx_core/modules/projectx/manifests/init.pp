
class projectx($node_version = "v0.10.33") {
    # Add some default path values
    Exec { path => ['/usr/local/bin','/usr/local/sbin','/usr/bin/','/usr/sbin','/bin','/sbin', "/home/vagrant/nvm/${node_version}/bin"], }

    exec { "apt-update":
        command => "/usr/bin/apt-get update"
    }

    Exec["apt-update"] -> Package <| |>

    # Setup your locale to avoid warnings
    file { '/etc/default/locale':
      content => "LANG=\"en_US.UTF-8\"\nLC_ALL=\"en_US.UTF-8\"\n"
    }

    # Base packages
    class { essentials: }

    # Install and setup nginx web server
    class { nginx:
        require => [Class["essentials"]]
    }

    # Install and setup phantomjs and casperjs
    class { casperjs:
        require => [Class["essentials"]]
    }

    # Install node through NVM
    class { 'nvm':
        node_version => $node_version,
        require => [Class["essentials"]]
    }

    # Install ruby
    class { 'ruby':
      require => [Class["essentials"]]
    }

    # Installs Redis
    class { 'redis':
      version => '2.8.17',
      require => [Class["essentials"]]
    }

    # Install MongoDB
    class { 'mongodb':
      require => [Class["essentials"]]
    }

    # Install Elastic Search
    class {'elasticsearch':
      version => '1.4.1',
      require => [Class["essentials"]]
    }

    # This function depends on some commands in the nvm.pp file
    define npm( $directory="/home/vagrant/nvm/${projectx::node_version}/lib/node_modules" ) {
      exec { "install-${name}-npm-package":
        unless => "test -d ${directory}/${name}",
        command => "npm install -g ${name}",
        require => Exec['install-node'],
      }
    }

    # Global npm modules
    npm { ["nodemon",
          "grunt-cli",
          "bower",
          "yo",
          "mocha" ]:
    }

    # Make sure our code directory has proper permissions
    file { '/home/vagrant/code':
        ensure => "directory",
        owner  => "vagrant",
        group  => "vagrant"
    }
}
