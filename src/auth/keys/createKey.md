# 生成私钥
openssl genpkey -algorithm RSA -out private.key -aes256
# 生成公钥
openssl rsa -in private.key -pubout -out public.key