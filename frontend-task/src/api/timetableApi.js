import axios from 'axios'
import { JOURNEYS_URL } from '@/config.js'


export default {
    getJourneys () {
        return axios.get(JOURNEYS_URL)
    }
}
