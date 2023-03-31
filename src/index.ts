// Here you can do import aggregation and stuff

import { sum as sumJS } from '#utils/demoJS.js'
import { sum as sumTS } from '#utils/demoTS.js'

// With aggregation imports/exports you should have no code that executes on import
// This is purely for demo purposes
console.log(`JS imported sum: ${sumJS(1, 2)}`)
console.log(`TS imported sum: ${sumTS(1, 2)}`)

export { sumJS, sumTS }
