const headers = {
    "Authorization": 'EGCDmegMQ2IUlN-xTuSWAys6Eh8RxOSZcFiBpMFkcwB1R5tvn58'
}

export async function getTournaments(page) {
    const res = await fetch(`https://api.pandascore.co/csgo/tournaments?page=${page}&per_page=6&`, { headers })
    return res.json()
}
export async function getTournamentsByType(type, page) {
    const res = await fetch(`https://api.pandascore.co/csgo/tournaments/${type}?page=${page}&per_page=6&`, { headers })
    return res.json()
}
export async function getTournament(id) {
    const res = await fetch(`https://api.pandascore.co/tournaments/${id}`, { headers })
    return res.json()
}
export async function getTournamentMatches(id) {
    const res = await fetch(`https://api.pandascore.co/tournaments/${id}/matches`, { headers })
    return res.json()
}
export async function getMatches() {
    const res = await fetch(`https://api.pandascore.co/csgo/matches?page=1&per_page=8&`, { headers })
    return res.json()
}
export async function getTeams() {
    const res = await fetch(`https://api.pandascore.co/csgo/teams`, { headers })
    return res.json()
}
export async function getTeam(id) {
    const res = await fetch(`https://api.pandascore.co/teams/${id}`, { headers })
    return res.json()
}
export async function getTeamMatchs(id) {
    const res = await fetch(`https://api.pandascore.co/teams/${id}/matches`, { headers })
    return res.json()
}
export async function getTeamLeague(id) {
    const res = await fetch(`https://api.pandascore.co/teams/${id}/leagues`, { headers })
    return res.json()
}
export async function getTeamSeries(id) {
    const res = await fetch(`https://api.pandascore.co/teams/${id}/series`, { headers })
    return res.json()
}
export async function getTeamTournaments(id) {
    const res = await fetch(`https://api.pandascore.co/teams/${id}/tournaments`, { headers })
    return res.json()
}
export async function getPlayers() {
    const res = await fetch(`https://api.pandascore.co/csgo/players`, { headers })
    return res.json()
}
export async function getPlayer(id) {
    const res = await fetch(`https://api.pandascore.co/players/${id}`, { headers })
    return res.json()
}
export async function getPlayerMatches(id) {
    const res = await fetch(`https://api.pandascore.co/players/${id}/matches`, { headers })
    return res.json()
}
export async function getPlayerTournaments(id) {
    const res = await fetch(`https://api.pandascore.co/players/${id}/tournaments`, { headers })
    return res.json()
}