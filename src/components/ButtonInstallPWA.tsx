import { useEffect, useState } from "react";
import installIcon from '../assets/install-icon.png'

const ButtonInstallPWA = () => {
  /*
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall]= useState<any>(null);

  useEffect(() => {
    const handler = (e:any) => {
      console.log('test');
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
  */

  useEffect(() => {
    let deferredPrompt:any;
    window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt = e;
    });

    const installApp = document.getElementById('installApp');
    installApp?.addEventListener('click', async () => {
      if (deferredPrompt !== null) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
              deferredPrompt = null;
          }
      }
    });
  }, [])


  return (
    <>
    {
      /*supportsPWA && onClick={onClick}*/ (
        <div className="navbarItem">
          <a className="iconCentered"><img id="installApp" className="navbarIcon" src={installIcon} alt="install app" /></a>
        </div>
      )
    }
    </>
  );
};

export default ButtonInstallPWA;
