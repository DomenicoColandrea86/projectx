
$node_version = "v0.10.33"

file { '/etc/motd':
	content => "
  Project X
  - Version: 0.0.1
  - OS:      Official Ubuntu Server 64-bit 14.04
  - Node:    ${node_version}
  - IP:      192.168.33.10
  - Code:    ~/code/projectx
  - Author:  Domenico Colandrea
                                                          jjjj                                                  tttt
                                                         j::::j                                              ttt:::t
                                                          jjjj                                               t:::::t
                                                                                                             t:::::t
ppppp   ppppppppp   rrrrr   rrrrrrrrr      ooooooooooo  jjjjjjj    eeeeeeeeeeee        ccccccccccccccccttttttt:::::ttttttt                     xxxxxxx      xxxxxxx
p::::ppp:::::::::p  r::::rrr:::::::::r   oo:::::::::::ooj:::::j  ee::::::::::::ee    cc:::::::::::::::ct:::::::::::::::::t                      x:::::x    x:::::x
p:::::::::::::::::p r:::::::::::::::::r o:::::::::::::::oj::::j e::::::eeeee:::::ee c:::::::::::::::::ct:::::::::::::::::t                       x:::::x  x:::::x
pp::::::ppppp::::::prr::::::rrrrr::::::ro:::::ooooo:::::oj::::je::::::e     e:::::ec:::::::cccccc:::::ctttttt:::::::tttttt     ---------------    x:::::xx:::::x
 p:::::p     p:::::p r:::::r     r:::::ro::::o     o::::oj::::je:::::::eeeee::::::ec::::::c     ccccccc      t:::::t           -:::::::::::::-     x::::::::::x
 p:::::p     p:::::p r:::::r     rrrrrrro::::o     o::::oj::::je:::::::::::::::::e c:::::c                   t:::::t           ---------------      x::::::::x
 p:::::p     p:::::p r:::::r            o::::o     o::::oj::::je::::::eeeeeeeeeee  c:::::c                   t:::::t                                x::::::::x
 p:::::p    p::::::p r:::::r            o::::o     o::::oj::::je:::::::e           c::::::c     ccccccc      t:::::t    tttttt                     x::::::::::x
 p:::::ppppp:::::::p r:::::r            o:::::ooooo:::::oj::::je::::::::e          c:::::::cccccc:::::c      t::::::tttt:::::t                    x:::::xx:::::x
 p::::::::::::::::p  r:::::r            o:::::::::::::::oj::::j e::::::::eeeeeeee   c:::::::::::::::::c      tt::::::::::::::t                   x:::::x  x:::::x
 p::::::::::::::pp   r:::::r             oo:::::::::::oo j::::j  ee:::::::::::::e    cc:::::::::::::::c        tt:::::::::::tt                  x:::::x    x:::::x
 p::::::pppppppp     rrrrrrr               ooooooooooo   j::::j    eeeeeeeeeeeeee      cccccccccccccccc          ttttttttttt                   xxxxxxx      xxxxxxx
 p:::::p                                                 j::::j
 p:::::p                                       jjjj      j::::j
p:::::::p                                     j::::jj   j:::::j
p:::::::p                                     j::::::jjj::::::j
p:::::::p                                      jj::::::::::::j
ppppppppp                                        jjj::::::jjj
                                                    jjjjjj
\n"
}

# Make all the magic happen by instantiating the projectx class :)
class { projectx:
	node_version => $node_version
}

