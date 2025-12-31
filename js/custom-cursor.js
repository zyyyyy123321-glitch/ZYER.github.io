// ==========================================
  // 自定义鼠标效果（优化版）
  // ==========================================

  class CustomCursor {
    constructor() {
        this.cursor = null;
        this.glow = null;
        this.trails = [];
        this.maxTrails = 20;
        this.lastTrailTime = 0;

        this.init();
    }

    init() {
        this.createCursor();
        this.addEventListeners();
    }

    createCursor() {
        // 主光标
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        // 光晕效果
        this.glow = document.createElement('div');
        this.glow.className = 'cursor-glow';
        document.body.appendChild(this.glow);
    }

    addEventListeners() {
        // 鼠标移动 - 直接跟随，无延迟
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            // 立即更新光标位置
            this.cursor.style.left = x + 'px';
            this.cursor.style.top = y + 'px';
            this.glow.style.left = x + 'px';
            this.glow.style.top = y + 'px';

            // 创建虚影效果
            this.createTrail(x, y);
        });

        // 鼠标点击
        document.addEventListener('mousedown', (e) => {
            this.createClickEffect(e.clientX, e.clientY);
        });

        // 悬停在交互元素上
        const bindHoverEvents = () => {
            const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .nav-links a, .tag');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    this.cursor.classList.add('hover');
                });
                el.addEventListener('mouseleave', () => {
                    this.cursor.classList.remove('hover');
                });
            });
        };

        bindHoverEvents();

        // 动态添加的元素也需要绑定事件
        const observer = new MutationObserver(() => {
            bindHoverEvents();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    createTrail(x, y) {
        const now = Date.now();

        // 控制虚影创建频率（每25ms创建一个）
        if (now - this.lastTrailTime < 25) {
            return;
        }
        this.lastTrailTime = now;

        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);

        // 存储虚影引用
        this.trails.push(trail);

        // 限制虚影数量
        if (this.trails.length > this.maxTrails) {
            const oldTrail = this.trails.shift();
            oldTrail.remove();
        }

        // 动画结束后移除虚影
        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
            const index = this.trails.indexOf(trail);
            if (index > -1) {
                this.trails.splice(index, 1);
            }
        }, 1000);
    }

    createClickEffect(x, y) {
        const clickEffect = document.createElement('div');
        clickEffect.className = 'cursor-click';
        clickEffect.style.left = x + 'px';
        clickEffect.style.top = y + 'px';
        document.body.appendChild(clickEffect);

        // 动画结束后移除
        setTimeout(() => {
            if (clickEffect.parentNode) {
                clickEffect.remove();
            }
        }, 500);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
});