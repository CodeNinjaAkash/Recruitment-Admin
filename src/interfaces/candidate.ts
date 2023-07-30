import { IQuestion } from "./question";
import { ICollege } from "./college";
interface ICandidatedata {
    _id?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    collegeName?: string;
    mobileNo?: string;
    registerDate?: string;
    resultPercentage?: string;
    link?: string;
  }
  interface ICandidate {
    _id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    dob: string;
    mobileNo: string;
    educationDetails: string;
    areaOfInterest: string;
    futureGoal: string;
    currentAddress: string;
    experience: string;
    college: ICollege;
    registerDate: string;
    candidateQuestion: IQuestion[];
    currentTime: string;
    step: string;
    currentPath: string;
    __v: number;
    refreshToken: string;
    token: string;
    joinToken: string;
    link: string;
    resultPercentage: string;
    quizTimer:{hours:number, minutes:number, seconds: number}|undefined;
  }

  export type { ICandidate, ICandidatedata};
