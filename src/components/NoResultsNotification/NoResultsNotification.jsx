import { useEffect, useRef } from 'react'; // хуки React
import toast from 'react-hot-toast'; // Відображення повідомлень (toast).

// Компонент `NoResultsNotification` відповідає за відображення повідомлення про помилку
// Проп 'message' дозволяє налаштувати текст повідомлення
// Якщо 'message' не передано - значення за замовчуванням
const NoResultsNotification = ({ message }) => {
  // Використовується `useRef`, щоб зберігати стан про те, чи вже було показано сповіщення. Початкове значення — 'false'.
  // useRef гарантує, що сповіщення відображається лише один раз, навіть якщо компонент перерендрується.
  const hasToastShown = useRef(false);

  // Хук `useEffect` спрацьовує після першого рендеру компонента
  useEffect(() => {
    // Перевіряємо, чи сповіщення вже показано
    // 'if (!hasToastShown.current)' запобігає повторному виконанню
    if (!hasToastShown.current) {
      toast.error(
        message || 'No results found. Please try a different query. 🤷‍♂️'
      );
      hasToastShown.current = true;
    }
  }, [message]);

  return null;
};

export default NoResultsNotification;
