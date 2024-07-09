export enum VerificationType {
  Traditional = 0,
  Voice = 1,
  Both = 2,
}

export const VerificationTypeWords: { [key: number]: string } = {
  [VerificationType.Traditional]: "Tradition",
  [VerificationType.Voice]: "Voice",
  [VerificationType.Both]: "Both",
};
