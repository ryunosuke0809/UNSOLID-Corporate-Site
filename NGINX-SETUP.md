# Nginx セットアップ手順 - UNSOLID STG環境

## 🎯 目的
`.html` 拡張子をURLから除外し、クリーンなURLを実現する

例: `/jp/about.html` → `/jp/about`

---

## 📝 セットアップ手順

### 1. Nginx設定ファイルをバックアップ

```bash
sudo cp /etc/nginx/sites-available/unsolid /etc/nginx/sites-available/unsolid.backup
```

### 2. 設定ファイルを編集

```bash
sudo nano /etc/nginx/sites-available/unsolid
```

### 3. 以下の内容に置き換え

```nginx
server {
    listen 80;
    server_name stg-unsolid.humid.co.jp;

    root /var/www/staging/unsolid;
    index index.html;

    charset utf-8;

    # Redirect .html URLs to clean URLs
    if ($request_uri ~ ^/(.*)\\.html(\\?.*)?$) {
        return 301 /$1$is_args$args;
    }

    # Serve .html files for clean URLs
    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    location /jp/ {
        try_files $uri $uri.html $uri/ =404;
    }
    
    location /en/ {
        try_files $uri $uri.html $uri/ =404;
    }

    # Redirect root to Japanese
    location = / {
        return 302 /jp/;
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss;
}
```

### 4. 設定ファイルの構文チェック

```bash
sudo nginx -t
```

✅ 成功メッセージが表示されればOK:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

❌ エラーが出た場合は、設定を見直してください

### 5. Nginxを再起動

```bash
sudo systemctl restart nginx
```

または

```bash
sudo systemctl reload nginx
```

### 6. 動作確認

#### ブラウザで確認:
- `http://stg-unsolid.humid.co.jp/jp/` → 正常表示
- `http://stg-unsolid.humid.co.jp/jp/about` → 正常表示
- `http://stg-unsolid.humid.co.jp/jp/about.html` → `/jp/about` にリダイレクト

#### コマンドラインで確認:
```bash
# Clean URL でアクセス（正常に表示されるべき）
curl -I http://stg-unsolid.humid.co.jp/jp/about

# .html 付きでアクセス（301リダイレクトされるべき）
curl -I http://stg-unsolid.humid.co.jp/jp/about.html
```

---

## 🔧 トラブルシューティング

### 問題1: 404 Not Found エラー

**原因**: `try_files` に `.html` が含まれていない

**解決策**: 
```nginx
location / {
    try_files $uri $uri.html $uri/ =404;
}
```
`$uri.html` を追加

### 問題2: リダイレクトループ

**原因**: リダイレクトの条件が正しくない

**解決策**: if文の正規表現を確認
```nginx
if ($request_uri ~ ^/(.*)\\.html(\\?.*)?$) {
    return 301 /$1$is_args$args;
}
```

### 問題3: CSS/JSが読み込まれない

**原因**: 相対パスの問題またはキャッシュ

**解決策**:
```bash
# ブラウザのキャッシュをクリア
# または強制リロード (Ctrl+Shift+R / Cmd+Shift+R)
```

### エラーログの確認

```bash
sudo tail -f /var/log/nginx/error.log
```

---

## 📊 変更前後の比較

### 変更前:
```nginx
location / {
    try_files $uri $uri/ =404;
}
```

### 変更後:
```nginx
location / {
    try_files $uri $uri.html $uri/ =404;
}
```

**重要な違い**: `$uri.html` が追加され、拡張子なしのURLに対して `.html` ファイルを探すようになります。

---

## 🔄 元に戻す方法

問題が発生した場合、バックアップから復元できます:

```bash
sudo cp /etc/nginx/sites-available/unsolid.backup /etc/nginx/sites-available/unsolid
sudo nginx -t
sudo systemctl restart nginx
```

---

## ✅ チェックリスト

- [ ] バックアップ作成済み
- [ ] 設定ファイル編集完了
- [ ] `sudo nginx -t` でエラーなし
- [ ] Nginx再起動完了
- [ ] ブラウザで `/jp/about` が表示される
- [ ] `/jp/about.html` が `/jp/about` にリダイレクトされる
- [ ] CSS/JSが正常に読み込まれる

---

## 📞 サポート

問題が解決しない場合は、以下の情報を提供してください:

```bash
# Nginxのバージョン
nginx -v

# エラーログの最後の20行
sudo tail -n 20 /var/log/nginx/error.log

# 設定ファイルの内容
cat /etc/nginx/sites-available/unsolid
```
