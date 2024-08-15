export interface createPerson {
  name: string;
}

export interface VoterPerson {
  id: number,
  name: string,
  voted: boolean 
}


export interface CandidatePerson {
  id: number
  name: string
  votes: number
}
