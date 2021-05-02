import { Helmet } from "react-helmet-async";

function PageTitle({title}){
  return( 
    <Helmet>
      <title>{title} | INSTACLONE</title>
    </Helmet>
  );
}
export default PageTitle;