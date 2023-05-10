import { useGetLocalization } from '@/hooks/reduxHooks';
import localizationJSON from '@/assets/json/localization.json';

export default function WelcomePage() {
  const { lang } = useGetLocalization();

  return <section className="container">{localizationJSON[lang].titleWelcome}</section>;
}
