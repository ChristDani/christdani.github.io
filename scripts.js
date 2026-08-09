const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const themeToggle = document.querySelector('.theme-toggle');

window.addEventListener('scroll', () => {
	header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

navToggle.addEventListener('click', () => {
	const isOpen = siteNav.classList.toggle('open');
	navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
	siteNav.classList.remove('open');
	navToggle.setAttribute('aria-expanded', 'false');
}));

themeToggle.addEventListener('click', () => {
	const isLight = document.documentElement.classList.toggle('light');
	localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
});

if (localStorage.getItem('portfolio-theme') === 'light') document.documentElement.classList.add('light');

const cvDownloads = document.querySelectorAll('.cv-download');
const closeCvMenus = () => cvDownloads.forEach((download) => {
	const trigger = download.querySelector('.cv-trigger');
	const menu = download.querySelector('.cv-menu');
	menu.hidden = true;
	trigger.setAttribute('aria-expanded', 'false');
});

cvDownloads.forEach((download) => {
	const trigger = download.querySelector('.cv-trigger');
	const menu = download.querySelector('.cv-menu');
	trigger.addEventListener('click', (event) => {
		event.stopPropagation();
		const shouldOpen = menu.hidden;
		closeCvMenus();
		menu.hidden = !shouldOpen;
		trigger.setAttribute('aria-expanded', String(shouldOpen));
	});
	menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeCvMenus));
});

document.addEventListener('click', closeCvMenus);
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') closeCvMenus();
});

const revealObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			revealObserver.unobserve(entry.target);
		}
	});
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
