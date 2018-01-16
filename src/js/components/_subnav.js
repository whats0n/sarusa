import {ACTIVE, OPEN, DOC} from '../_constants';

;(() => {

  const setActive = (other, current, className) => {
    other.removeClass(className);
    current.addClass(className);
  };

  const controls = $('[data-subnav-control]');
  const containers = $('[data-subnav-container]');

  controls.each((i, control) => {
    control = $(control);

    const containerName = control.data('subnav-control');
    const otherContainers = containers.not(`[data-subnav-container="${containerName}"]`);
    const container = containers.filter(`[data-subnav-container="${containerName}"]`);

    control.click(e => {
      e.preventDefault();
      if (container.hasClass(OPEN)) {
        container
          .add(('[data-subnav-menu]'))
          .removeClass(OPEN);
        $('[data-subnav-link]').removeClass(ACTIVE);
      } else {
        setActive(otherContainers, container, OPEN);
      }
    });
  });

  containers.each((i, nav) => {
    nav = $(nav);

    const menus = nav.find('[data-subnav-menu]');
    const links = nav.find('[data-subnav-link]');
    const closeButtons = nav.find('[data-subnav-close]');

    closeButtons.each((i, button) => {
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
