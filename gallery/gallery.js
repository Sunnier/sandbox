		const calculateSettingAsThemeString = ({ localStorageTheme, systemSettingDark }) => {
			if (localStorageTheme !== null) {
				return localStorageTheme;
			}
			if (systemSettingDark.matches) {
				return "dark";
			}
			return "light";
		}

		const updateToggle = ({ toggleEl, isDark }) => {
			toggleEl.checked = isDark;
		}

		const updateThemeOnHtml = ({ theme }) => {
			document.querySelector("html").setAttribute("data-theme", theme);
		}

		document.addEventListener("DOMContentLoaded", () => {
			const localStorageTheme = localStorage.getItem("theme");
			const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
			const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
			let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

			const debounceLeading = (func, timeout = 400) => {
				let timer;
				return (...args) => {
					if (!timer) {
						func.apply(this, args);
						themeToggle.setAttribute('disabled', 'disabled')
					}
					clearTimeout(timer);
					timer = setTimeout(() => {
						timer = undefined;
						themeToggle.removeAttribute('disabled')
					}, timeout);
				};
			}

			const changeTheme = () => {
				const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
				localStorage.setItem("theme", newTheme);
				updateThemeOnHtml({ theme: newTheme });
				currentThemeSetting = newTheme;
				updateToggle({ toggleEl: themeToggle, isDark: currentThemeSetting === "dark" });
				console.log("click");
			}

			updateToggle({ toggleEl: themeToggle, isDark: currentThemeSetting === "dark" });
			updateThemeOnHtml({ theme: currentThemeSetting });

			themeToggle.addEventListener("change", debounceLeading(changeTheme));

			const [x] = document.getElementsByClassName("gallery-flex");

			const data = [
				[82, 'Lorem ipsum dolor sit amet'],
				[309, 'Nunc dapibus aliquet nisl sed accumsan. Nunc eget eros metus maecenas.'],
				[25, 'Nulla condimentum diam sapien.'],
				[106, 'Aenean egestas vel metus consectetur tempor. Donec porta ligula augue, et sodales dolor imperdiet nec. Aliquam in est ex praesent dui purus, convallis at laoreet ac, interdum eget orci. Donec ut massa ut augue rutrum finibus. Integer id hendrerit nulla. Phasellus nec nibh at elit dignissim maximus. Suspendisse nec tristique turpis, in cursus purus.'],
				[109, 'Nullam sed erat varius sem tincidunt faucibus et vitae tortor. In hac habitasse platea dictumst.'],
				[95, 'Lorem ipsum dolor sit amet'],
				[744, 'Nunc dapibus aliquet nisl sed accumsan. Nunc eget eros metus maecenas.'],
				[327, 'Aenean egestas vel metus consectetur tempor. Donec porta ligula augue, et sodales dolor imperdiet nec. Aliquam in est ex praesent dui purus, convallis at laoreet ac, interdum eget orci. Donec ut massa ut augue rutrum finibus. Integer id hendrerit nulla. Phasellus nec nibh at elit dignissim maximus. Suspendisse nec tristique turpis, in cursus purus.'],
				[645, 'Nulla condimentum diam sapien.'],
				[482, 'Nullam sed erat varius sem tincidunt faucibus et vitae tortor. In hac habitasse platea dictumst.'],
				[492, 'Lorem ipsum dolor sit amet'],
				[559, 'Nunc dapibus aliquet nisl sed accumsan. Nunc eget eros metus maecenas.'],
				[582, 'Nulla condimentum diam sapien.'],
				[98, 'Aenean egestas vel metus consectetur tempor. Donec porta ligula augue, et sodales dolor imperdiet nec. Aliquam in est ex. Praesent dui purus, convallis at laoreet ac, interdum eget orci. Donec ut massa ut augue rutrum finibus. Integer id hendrerit nulla. Phasellus nec nibh at elit dignissim maximus. Suspendisse nec tristique turpis, in cursus purus.'],
			]

			data.forEach(
				([id, title]) => {
					const y = document.createElement("figure")

					y.innerHTML = `
						<div class="pic">
							<img alt="${title}" src="https://picsum.photos/id/${id}/600/400">
						</div>
						<div class="description">
							${title}
						</div>
					`;

					x.appendChild(y)
				}
			)
		});
