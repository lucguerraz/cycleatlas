import type { H3Event } from 'h3'

export const getInclusionsFromParam = (event: H3Event<globalThis.EventHandlerRequest>) => {
  const query = getQuery(event)
  const fieldsParam = query.fields as string
  const fieldsStr = fieldsParam ? fieldsParam : 'metadata'
  const fields = fieldsStr.split(',').filter((field) => ['metadata', 'geodata', 'teritorydata'].includes(field))
  if (fields.length === 0) fields.push('metadata')

  const inclusion = {}
  fields.forEach((field) => {
    Object.assign(inclusion, inclusionOptions[field])
  })

  return inclusion
}

const inclusionOptions = {
  metadata: {
    athleteid: 1,
    name: 1,
    distance: 1,
    moving_time: 1,
    // elapsed_time: 1,
    total_elevation_gain: 1,
    // type: 1,
    // sport_type: 1,
    // device_name: 1,
    stravaid: 1,
    start_date: 1,
    // trainer: 1,
    // gear_id: 1,
    // start_latlng: 1,
    // end_latlng: 1,
    average_speed: 1,
    // average_cadence: 1,
    average_watts: 1,
    average_heartrate: 1,
    // geojson: 1,
    // countries: 1,
  },
  geodata: {
    stravaid: 1,
    'geojson.type': 1,
    'geojson.features.type': 1,
    'geojson.features.properties.name': 1,
    'geojson.features.geometry': 1,
  },
  teritorydata: {
    stravaid: 1,
    countries: 1,
  },
} as { [key: string]: object }
