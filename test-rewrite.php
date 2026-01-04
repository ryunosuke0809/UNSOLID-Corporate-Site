<?php
// Test if mod_rewrite is enabled
echo "<h2>Apache Rewrite Test</h2>";

if (function_exists('apache_get_modules')) {
    $modules = apache_get_modules();
    if (in_array('mod_rewrite', $modules)) {
        echo "<p style='color:green;'>✓ mod_rewrite is ENABLED</p>";
    } else {
        echo "<p style='color:red;'>✗ mod_rewrite is DISABLED</p>";
    }
    echo "<h3>Loaded Apache Modules:</h3>";
    echo "<pre>";
    print_r($modules);
    echo "</pre>";
} else {
    echo "<p style='color:orange;'>⚠ Cannot detect Apache modules (not running as Apache module)</p>";
}

echo "<h3>Server Info:</h3>";
echo "<pre>";
echo "Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "\n";
echo "Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "\n";
echo "Request URI: " . $_SERVER['REQUEST_URI'] . "\n";
echo "</pre>";

echo "<h3>.htaccess Test:</h3>";
if (file_exists('.htaccess')) {
    echo "<p style='color:green;'>✓ .htaccess file exists in root</p>";
    echo "<pre>" . htmlspecialchars(file_get_contents('.htaccess')) . "</pre>";
} else {
    echo "<p style='color:red;'>✗ .htaccess file NOT found</p>";
}
?>
