import { app, shell } from 'electron'
import { Spotilocal } from 'spotilocal'

app.on('ready', () => {
  open()
})

app.on('activate', () => {
  open()
})

const open = () => {
  let local = new Spotilocal()

  local.init().then(spotilocal => {
    return spotilocal.getStatus()
  }).then(status => {
    let trackName = status.track.track_resource.name
    let artistName = status.track.artist_resource.name
    let query = encodeURIComponent(`${artistName} - ${trackName}`)

    let url = 'https://genius.com/search?q='

    shell.openExternal(`${url}${query}`)
  })
}
