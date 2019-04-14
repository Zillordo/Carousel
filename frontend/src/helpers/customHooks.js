import { useState } from 'react';

const useForceRender = () => {
    const [value, set] = useState(true);
    return () => set(!value);
}

export default useForceRender;