# UNSOLID Inc. Corporate Website - デプロイメントガイド

## クリーンURL（拡張子なし）の設定

このサイトは `.html` 拡張子を URL から除外するクリーンURL機能を使用しています。

例: `/jp/about.html` → `/jp/about`

---

## Apache サーバーの場合

### 1. mod_rewrite が有効か確認

```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### 2. .htaccess の使用を許可

Apache の設定ファイルを編集:

```bash
sudo nano /etc/apache2/sites-available/000-default.conf
```

または

```bash
sudo nano /etc/apache2/sites-available/your-site.conf
```

以下を追加:

```apache
<Directory /path/to/webapp>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

### 3. Apache を再起動

```bash
sudo systemctl restart apache2
```

---

## Nginx サーバーの場合

### 1. Nginx 設定ファイルを編集

```bash
sudo nano /etc/nginx/sites-available/your-site
```

### 2. `nginx.conf` の内容を server ブロックに追加

このリポジトリの `nginx.conf` ファイルを参照し、以下を調整してください:

- `server_name`: あなたのドメイン名
- `root`: webappディレクトリへの絶対パス

### 3. 設定をテストして再起動

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## トラブルシューティング

### 404 Not Found エラーが出る場合

#### Apache の場合:

1. **mod_rewrite が有効か確認**
   ```bash
   apache2ctl -M | grep rewrite
   ```
   `rewrite_module` が表示されればOK

2. **AllowOverride が設定されているか確認**
   ```bash
   grep -r "AllowOverride" /etc/apache2/
   ```
   `AllowOverride All` または `AllowOverride FileInfo` が必要

3. **.htaccess ファイルの存在確認**
   ```bash
   ls -la /path/to/webapp/.htaccess
   ls -la /path/to/webapp/jp/.htaccess
   ls -la /path/to/webapp/en/.htaccess
   ```

4. **Apache エラーログを確認**
   ```bash
   sudo tail -f /var/log/apache2/error.log
   ```

#### Nginx の場合:

1. **設定ファイルの構文チェック**
   ```bash
   sudo nginx -t
   ```

2. **エラーログを確認**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

3. **try_files ディレクティブが正しいか確認**
   ```nginx
   location / {
       try_files $uri $uri.html $uri/ =404;
   }
   ```

---

## 一時的に .html 拡張子を復元する場合

クリーンURL機能を無効化したい場合:

### Apache:
```bash
# .htaccess をリネーム
mv .htaccess .htaccess.bak
mv jp/.htaccess jp/.htaccess.bak
mv en/.htaccess en/.htaccess.bak
```

### Nginx:
設定ファイルから try_files と rewrite ルールをコメントアウト

---

## テスト方法

### テストファイルを使用

1. `test-rewrite.php` をブラウザで開く
2. mod_rewrite の状態を確認

### 手動テスト

```bash
# .html 付きでアクセス（自動リダイレクトされるべき）
curl -I https://your-domain.com/jp/about.html

# クリーンURL でアクセス（正常に表示されるべき）
curl https://your-domain.com/jp/about
```

---

## サポート

問題が解決しない場合は、以下の情報を提供してください:

- サーバーの種類 (Apache / Nginx)
- OS とバージョン
- エラーログの内容
- `test-rewrite.php` の出力結果

---

## 参考リンク

- [Apache mod_rewrite](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)
- [Nginx try_files](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files)
