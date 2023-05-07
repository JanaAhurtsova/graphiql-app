import { useAppSelector } from '@/hooks/reduxHooks';
import localizationJSON from '@/assets/json/localization.json';

export default function WelcomePage() {
  const { lang } = useAppSelector((state) => state.localization);

  return <section className="container">{localizationJSON[lang].titleWelcome}</section>;
}
