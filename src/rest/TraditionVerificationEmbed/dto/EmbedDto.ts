export type CreateVerificationEmbedDto = {

  title: string;
  description: string;
  thumbnail?: string;
  image?: string;
  footer?: {
    url: string;
    value: string;
  };
  author?: {
    url: string;
    value: string;
  };
};
