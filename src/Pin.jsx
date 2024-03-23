import { useEffect, useState } from 'react';
import PinUrl from './component/PinUrl';

export default function Pin() {
  const [page, setPage] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [pin, setPin] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserve, { threshold: 0 });
    observer.observe(document.querySelector('#observe'));
    return () => {
      observer.disconnect();
    };
  }, []);
  // page 변경에 따른 API 호출

  function handleObserve(entries) {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  // fetch 하기
  useEffect(() => {
    fetchJson();
  }, []);

  useEffect(() => fetchJson, [page]);

  function fetchJson() {
    setisLoading(true);

    fetch(`public/mock.json`)
      .then((res) => res.json())
      .then((data) => {
        setPin((prevPin) => [...prevPin, ...data.images]);
        setisLoading(false);
      });
  }

  return (
    <div className='image-container'>
      {pin.map((item) => (
        <div key={item.id} className='image-object'>
          <PinUrl pin={item.url} />
        </div>
      ))}
      <div id='observe' style={{ height: '10px' }}></div>
    </div>
  );
}
