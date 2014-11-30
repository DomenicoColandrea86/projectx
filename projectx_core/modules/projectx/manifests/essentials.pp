
class essentials {
  group { "puppet" :
    ensure => present,
    name => "puppet";
  }

  Package { ensure => installed }

  package {
    ["curl",
    "libssl-dev",
    "git-core",
    "python",
    "build-essential"
    ]:
  }

  file { "/home/vagrant/software":
    ensure => "directory",
  }

  file { "/usr/local":
   recurse => true,
   group => "vagrant",
   owner => "vagrant";
  }
}
