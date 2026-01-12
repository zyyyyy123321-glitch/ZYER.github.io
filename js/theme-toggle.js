// 主题切换功能
(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');

    // 获取保存的主题或系统偏好
    function getPreferredTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    // 应用主题
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // 更新图标
        themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';

        // 更新Giscus主题（如果存在）
        const giscusFrame = document.querySelector('.giscus-frame');
        if (giscusFrame) {
            giscusFrame.contentWindow.postMessage({
                giscus: {
                    setConfig: {
                        theme: theme === 'light' ? 'light' : 'dark_dimmed'
                    }
                }
            }, 'https://giscus.app');
        }
    }

    // 切换主题
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    // 初始化
    function init() {
        if (themeToggle) {
            const preferredTheme = getPreferredTheme();
            setTheme(preferredTheme);

            themeToggle.addEventListener('click', toggleTheme);

            // 添加键盘快捷键 (Ctrl/Cmd + Shift + T)
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                    e.preventDefault();
                    toggleTheme();
                }
            });
        }
    }

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'light' : 'dark');
        }
    });

    // 页面加载时初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
