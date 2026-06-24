interface EmailTemplateProps {
  name: string;
  url: string;
}
// TODO: Use email template from react-email 
export function EmailTemplate({ name = 'there', url }: EmailTemplateProps) {
  return (
    <div>
      <h1>Hi {name}! Welcome to MyAnimeListClone </h1>
      <p>Please verify your email by clicking the link below:</p>
      <a href={url}>Verify Email</a>
    </div>
  )
}