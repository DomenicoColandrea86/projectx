
$node_version = "v0.10.33"

file { '/etc/motd':
	content => "
      .-----.
    .' -   - '.        Project X
   /  .-. .-.  \\      - Version: 0.0.1
   |  | | | |  |
    \\ \\o/ \\o/ /     - OS:      Official Ubuntu Server 64-bit 14.04
   _/    ^    \\_      - Node:    ${node_version}
  | \\  '---'  / |     - IP:      192.168.33.10
  / /`--. .--`\\ \\    - Code:    ~/code/projectx
 / /'---` `---'\\ \\   - Author:  Domenico Colandrea
 '.__.       .__.'
     `|     |`
      |     \\
      \\      '--.
       '.        `\\
         `'---.   |
            ,__) /
             `..'
\n"
}

# Make all the magic happen by instantiating the projectx class :)
class { projectx:
	node_version => $node_version
}

