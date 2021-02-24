import { createContext, ReactNode, useState } from 'react'
import challenges from '../../json/challenges.json'

type ChallengesContextData = {
    level: number
    currentExp: number
    challengesCompleted: number
    activeChallenge: Challenge
    expToNextLevel: number
    // tipagem de função
    levelUp: () => void
    startNewChallenge: () => void
    resetChallenge: () => void
}

type Challenge = {
    type: 'body' | 'eye'
    description: string
    amount: number
}

type ChallengesProviderProps = {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export const ChallengesProvider = ({ children }: ChallengesProviderProps) => {
    const [level, setLevel] = useState(1)
    const [currentExp, setCurrentExp] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null)

    const expToNextLevel = Math.pow((level +1) *7, 2)

    const levelUp = () => {
        setLevel(level+1)
    }

    const startNewChallenge = () => {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge)
    }

    const resetChallenge = () => {
        setActiveChallenge(null)
    }

    return (
        <ChallengesContext.Provider value={{ level, currentExp, challengesCompleted, activeChallenge, expToNextLevel ,levelUp, startNewChallenge, resetChallenge}}>
            {children}
        </ChallengesContext.Provider>      
    )
}

