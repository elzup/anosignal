import { render } from 'ink'
import * as React from 'react'
import Ui from './ui'

export default (name: string) => {
  return render(<Ui name={name} />)
}
