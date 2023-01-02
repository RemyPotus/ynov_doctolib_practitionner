import { useEffect, useState } from "react";
import installIcon from '../assets/install-icon.png'

const ButtonInstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall]= useState<any>(null);

  useEffect(() => {
    const handler = (e:any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt:any) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  return (
    <>
    {
      supportsPWA && (
        <div className="navbarItem">
          <a className="iconCentered"><img className="navbarIcon" src={installIcon} alt="install app" onClick={onClick} /></a>
        </div>
      )
    }
    </>
  );
};

export default ButtonInstallPWA;
