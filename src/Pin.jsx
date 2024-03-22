import { useEffect, useState } from 'react';
import PinUrl from './component/PinUrl';

export default function Pin() {
  const [pin, setPin] = useState([]);

  useEffect(() => {
    fetch(`public/mock.json`)
      .then((res) => res.json())
      .then((data) => setPin(data.images));
  }, []);

  return (
    <ul>
      {pin.map((item) => (
        <li key={item.id}>
          <PinUrl pin={item.url} />
        </li>
      ))}
    </ul>
  );
}
