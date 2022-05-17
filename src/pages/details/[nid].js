import { Button, Spin } from 'antd';
import Parser from 'html-react-parser';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getNewsDetails } from 'src/services';

import { DetailsPageWrapper } from '@/components/styledPages';

function Details() {
  const router = useRouter();
  const { nid } = router.query;

  const [details, setDetails] = useState();
  const [error, setError] = useState();

  async function handleUserDetails() {
    if (nid) {
      try {
        const result = await getNewsDetails(nid);
        if (result?.res) {
          setDetails(result.res);
        } else {
          setError(result.error);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error({ error }, ' error at handleUserDetails');
        setError({ error });
      }
    }
  }

  function handleReload() {
    router.reload();
  }

  useEffect(() => {
    handleUserDetails();
  }, [nid]);
  return (
    <DetailsPageWrapper>
      {error || details ? (
        error ? (
          <div className="error_container">
            <p> {error.message || 'Something went wrong'}</p>
            <Button onClick={handleReload}> Reload </Button>
          </div>
        ) : (
          <>
            <h1> Title: {details?.title}</h1>
            <h2>Points: {details?.points}</h2>
            <div className="comment_container">
              <h3>
                {' '}
                <b>Comments</b>
              </h3>
              {details?.children?.slice(0, 10).map(comment => (
                <div key={comment.id} className="single_comment">
                  {' '}
                  <p>
                    <b>Author: </b>
                    {comment?.author}
                  </p>
                  <p>
                    <b>Comment :</b>
                    {Parser(comment.text)}
                  </p>
                </div>
              ))}
            </div>
          </>
        )
      ) : (
        <Spin size="large" />
      )}
    </DetailsPageWrapper>
  );
}

export default Details;
