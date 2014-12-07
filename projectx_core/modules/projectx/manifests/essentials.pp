
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
    "libc6",
    "libfontconfig1",
    "libfreetype6",
    "libgcc1",
    "libjpeg8",
    "libpng12-0",
    "libstdc++6",
    "zlib1g"
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
