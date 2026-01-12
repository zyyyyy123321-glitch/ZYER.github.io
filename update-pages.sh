#!/bin/bash

# 为每个页面添加主题切换按钮和GA
files=("about.html" "blog.html" "portfolio.html")

for file in "${files[@]}"; do
    echo "Processing $file..."

    # 在 <body> 后添加主题切换按钮（如果不存在）
    if ! grep -q "theme-toggle" "$file"; then
        sed -i '/<canvas id="particles-canvas"><\/canvas>/a\
\
    <!-- 主题切换按钮 -->\
    <button id="theme-toggle" class="theme-toggle" aria-label="切换主题">\
        <span class="theme-icon">🌙</span>\
    </button>
' "$file"
    fi

    # 在 </footer> 后添加GA和theme-toggle.js（如果不存在）
    if ! grep -q "theme-toggle.js" "$file"; then
        sed -i '/<\/footer>/a\
\
    <!-- Google Analytics -->\
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"><\/script>\
    <script>\
        window.dataLayer = window.dataLayer || [];\
        function gtag(){dataLayer.push(arguments);}\
        gtag('"'"'js'"'"', new Date());\
        gtag('"'"'config'"'"', '"'"'G-XXXXXXXXXX'"'"');\
    <\/script>\
\
    <script src="js/theme-toggle.js"><\/script>
' "$file"
    fi
done

echo "Done!"
