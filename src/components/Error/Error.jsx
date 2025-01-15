import { useEffect, useRef } from 'react'; // хуки React
import toast from 'react-hot-toast'; // Відображення повідомлень (toast).

// Компонент `Error` відповідає за відображення повідомлення про помилку
const Error = () => {
  // Використовується `useRef`, щоб зберігати стан про те, чи вже було показано сповіщення. Початкове значення — 'false'.
  // useRef гарантує, що сповіщення відображається лише один раз, навіть якщо компонент перерендрується.
  const hasToastShown = useRef(false);
  // Хук `useEffect` спрацьовує після першого рендеру компонента
  useEffect(() => {
    // Перевіряємо, чи сповіщення вже показано
    if (!hasToastShown.current) {
      // 'if (!hasToastShown.current)' запобігає повторному виконанню
      // Якщо сповіщення ще не було, викликаємо `toast.error` для відображення повідомлення про помилку.
      toast.error('Something went wrong 🤦‍♂️, try again...');
      // Встановлюємо значення `true`, щоб уникнути повторного показу сповіщення.
      hasToastShown.current = true;
    }
  }, []); // Порожній масив залежностей - ефект виконається лише один раз

  return null; // Компонент не відображає жодного вмісту, повертаємо `null`.
};

export default Error;
