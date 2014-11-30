class mongodb {
  class {'::mongodb::globals':
    manage_package_repo => true,
    bind_ip             => ["127.0.0.1"],
  }

  class {'::mongodb::server':
    port    => 27017,
    verbose => true,
    ensure  => "present"
  }

  mongodb_database { 'projectx_prod':
    ensure   => present,
    tries    => 10,
    require  => Class['mongodb::server'],
  }

  mongodb_database { 'projectx_dev':
    ensure   => present,
    tries    => 10,
    require  => Class['mongodb::server'],
  }

  mongodb_database { 'projectx_test':
    ensure   => present,
    tries    => 10,
    require  => Class['mongodb::server'],
  }

  mongodb_user { 'root_prod':
    ensure        => present,
    password_hash => mongodb_password('root', 'root'),
    database      => 'projectx_prod',
    roles         => ['readWrite', 'dbAdmin'],
    tries         => 10,
    require       => Class['mongodb::server'],
  }

  mongodb_user { 'root_dev':
    ensure        => present,
    password_hash => mongodb_password('root', 'root'),
    database      => 'projectx_dev',
    roles         => ['readWrite', 'dbAdmin'],
    tries         => 10,
    require       => Class['mongodb::server'],
  }

  mongodb_user { 'root_test':
    ensure        => present,
    password_hash => mongodb_password('root', 'root'),
    database      => 'projectx_test',
    roles         => ['readWrite', 'dbAdmin'],
    tries         => 10,
    require       => Class['mongodb::server'],
  }
}
