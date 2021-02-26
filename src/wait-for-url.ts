import * as core from '@actions/core'
import axios from 'axios'
import {wait} from './wait'

const waitForUrl = async (url: string, MAX_TIMEOUT: number): Promise<void> => {
  const iterations = MAX_TIMEOUT / 2
  for (let i = 0; i < iterations; i++) {
    try {
      await axios.get(url)
      core.info('Deployment is available, finishing…')
      return
    } catch (e) {
      core.info(
        `Unable to access the provided deployment, trying again in 2 seconds. iteration: ${i}/${iterations}`
      )
      await wait(2000)
    }
  }
  core.setFailed(`Timeout reached: Unable to connect to ${url}`)
}

export default waitForUrl
