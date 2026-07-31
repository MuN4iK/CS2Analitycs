import { createContext, useContext, useRef } from "react";
import { getTeam } from "./pandascore";

const TeamsCacheContext = createContext();

export function TeamsCacheProvider({ children }) {
    const cache = useRef({})

    function addTeam(team) {
        if (!team) return

        cache.current[team.id] = {
            id: team.id,
            name: team.name,
            image_url: team.image_url
        }
    }

    function addTeams(teams) {
        teams.forEach(team => {
            cache.current[team.id] = {
                id: team.id,
                name: team.name,
                image_url: team.image_url
            }
        });
    }

    function getTeamFromCache(id) {
        cache.current[id]
    }

    async function getCachedTeam(id) {
        const cacheTeam = getTeamFromCache(id)

        if (cacheTeam) {
            return cacheTeam
        }
        const team = await getTeam(id)

        cache.current[team.id] = {
            id: team.id,
            name: team.name
        }

        return team
    }

    return (
        <TeamsCacheContext.Provider value={{ addTeam, addTeams, getCachedTeam, getTeamFromCache }}>
            {children}
        </TeamsCacheContext.Provider>
    )

}

export function useTeamCache() {
    return useContext(TeamsCacheContext);
}