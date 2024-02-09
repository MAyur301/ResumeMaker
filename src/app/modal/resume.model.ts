export class address {
  street: string | null = null;
  country: string | null = null;
  city: string | null = null;
  Area: string | null = null;
  postal: number | null = null;
}

export class eduction {
  school: string | null = null;
  degree: string | null = null;
  percentage: string | null = null;
  start: Date | null = null;
  end: Date | null = null;
}
export class experience {
  cName: string | null = null;
  position: string | null = null;
  Experience: string | null = null;
  start: Date | null = null;
  end: Date | null = null;
}

export class resume {
  firstname: string | null = null;
  lastname: string | null = null;
  email: string | null = null;
  username: string | null = null;
  dob: Date | null = null;
  gender: string | null = null;
  skills:string[] | null = null
  address: address |null = null;
  eduction: eduction[] = [] ;
  experience: experience[] = [];
}
