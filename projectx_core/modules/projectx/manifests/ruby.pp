class ruby {
   package { ['ruby1.9.1' ]:
    ensure => 'installed'
  }

  # Install sass
  package { 'sass':
    ensure => 'installed',
    provider => 'gem',
    require => [ Package['ruby1.9.1'] ]
  }
}
