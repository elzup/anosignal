#!/usr/bin/env node
import * as meow from 'meow'
import main from '.'

const cli = meow(`
	Usage
	  $ anosignal

	Options
		--name  Your name

	Examples
	  $ anosignal --name=Jane
	  Hello, Jane
`)

main()
