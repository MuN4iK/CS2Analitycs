async function api(path) {
    const res = await fetch("/.netlify/functions/pandascore?path=" + encodeURIComponent(path))

    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
    }

    return res.json()
}

export async function getTournaments(page) {
    return api(`/csgo/tournaments?page=${page}&per_page=6&`)
}
export async function getTournamentsByType(type, page) {
    return api(`/csgo/tournaments/${type}?page=${page}&per_page=6&`)
}
export async function getTournament(id) {
    return api(`/tournaments/${id}`)
}
export async function getTournamentMatches(id) {
    return api(`/tournaments/${id}/matches`)
}
export async function getMatches() {
    return api(`/csgo/matches?page=1&per_page=8&`)
}
export async function getTeams() {
    return api(`/csgo/teams`)
}
export async function getTeam(id) {
    return api(`/teams/${id}`)
}
export async function getTeamMatchs(id) {
    return api(`/teams/${id}/matches`)
}
export async function getTeamLeague(id) {
    return api(`/teams/${id}/leagues`)
}
export async function getTeamSeries(id) {
    return api(`/teams/${id}/series`)
}
export async function getTeamTournaments(id) {
    return api(`/teams/${id}/tournaments`)
}
export async function getPlayers() {
    return api(`/csgo/players`)
}
export async function getPlayer(id) {
    return api(`/players/${id}`)
}
export async function getPlayerMatches(id) {
    return api(`/players/${id}/matches`)
}
export async function getPlayerTournaments(id) {
    return api(`/players/${id}/tournaments`)
}