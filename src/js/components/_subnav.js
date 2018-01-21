import {ACTIVE, OPEN, DOC, widthMD} from '../_constants';

;(() => {

  const setActive = (other, current, className) => {
    other.removeClass(className);
    current.addClass(className);
  };

  const controls = $('[data-subnav-control]');
  const closeButtons = $('[data-subnav-close]');
  const containers = $('[data-subnav-container]');

  controls.each((i, control) => {
    control = $(control);

    const containerName = control.data('subnav-control');
    const otherContainers = containers.not(`[data-subnav-container="${containerName}"]`);
    const container = containers.filter(`[data-subnav-container="${containerName}"]`);

    let timer = null;
    let active = false;

    const hideOnLeave = (e) => {
      if (window.matchMedia(`(max-width: ${widthMD}px)`).matches) return;
      active = false;
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        container
          .add(('[data-subnav-menu]'))
          .removeClass(OPEN);
        $('[data-subnav-link]').removeClass(ACTIVE);
      }, 300);
    };

    const showOnEnter = (e) => {
      if (window.matchMedia(`(max-width: ${widthMD}px)`).matches) return;
      active = true;
      timer && clearTimeout(timer);
      setActive(otherContainers, container, OPEN);
    };

    control
      .click(e => {
        e.preventDefault();
        if (active) return;
        if (container.hasClass(OPEN)) {
          container
            .add(('[data-subnav-menu]'))
            .removeClass(OPEN);
          $('[data-subnav-link]').removeClass(ACTIVE);
        } else {
          setActive(otherContainers, container, OPEN);
        }
      });

    control
      .add(container)
      .mouseover(showOnEnter)
      .mouseout(hideOnLeave);
  });

  closeButtons.each((i, button) => {
    button = $(button);
    const container = button.closest('[data-subnav-container]');
    button.click(e => {
      e.preventDefault();
      container.removeClass(OPEN);
    });
  });

  containers.each((i, nav) => {
    nav = $(nav);

    const menus = nav.find('[data-subnav-menu]');
    const links = nav.find('[data-subnav-link]');
    const backButtons = nav.find('[data-subnav-back]');

    backButtons.each((i, button) => {
      button = $(button);
      const currentMenu = button.closest('[data-subnav-menu]');
      button.click(e => {
        e.preventDefault();
        currentMenu.removeClass(OPEN);
      });
    });

    links.each((i, link) => {
      link = $(link);
      const level = link.data('subnav-level');
      const target = link.data('subnav-link');
      const currentMenus = menus.filter(`[data-subnav-level="${level}"]`);

      const otherLinks = links.filter((i, link) => $(link).data('subnav-level') >= level);
      const otherMenus = menus.filter((i, submenu) => $(submenu).data('subnav-level') >= level);
      const currentMenu = currentMenus.filter(`[data-subnav-menu="${target}"]`);

      const showMenu = () => {};
			
      link
        // .mouseenter(e => {
        //   setActive(otherMenus, currentMenu, OPEN);
        //   setActive(otherLinks, link, ACTIVE);
        // })
        .click(e => {
          e.preventDefault();
          setActive(otherMenus, currentMenu, OPEN);
          setActive(otherLinks, link, ACTIVE);
        });
    });
  });

  DOC.on('click', e => {
    const target = $(e.target);
    if (target.closest(controls).length || target.closest(containers).length) return;
    containers
      .add(('[data-subnav-menu]'))
      .removeClass(OPEN);
    $('[data-subnav-link]').removeClass(ACTIVE);
  });

})();
