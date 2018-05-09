lsof -i tcp:$1 | awk '$1=="node"{print $2}'|sed -n '1p'|xargs kill -9
