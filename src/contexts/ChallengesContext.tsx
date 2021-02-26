import { createContext, ReactNode, useEffect, useState } from 'react'
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
    completeChallenge: () => void
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

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    const levelUp = () => {
        setLevel(level+1)
    }

    const startNewChallenge = () => {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    const resetChallenge = () => {
        setActiveChallenge(null)
    }

    const completeChallenge = () => {
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge
        let finalExp = currentExp + amount

        if (finalExp >= expToNextLevel) {
            finalExp = finalExp - expToNextLevel
            levelUp()
        }

        setCurrentExp(finalExp)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider value={{ level, currentExp, challengesCompleted, activeChallenge, expToNextLevel ,levelUp, startNewChallenge, resetChallenge, completeChallenge}}>
            {children}
        </ChallengesContext.Provider>      
    )
}

