#!/bin/bash

# This takes forever to run and should be parallelized, YOU'VE BEEN WARNED!

for i in {1..1000}
do
  wrangler kv:key put --binding=REDIRECTS "/redirects/$i" "/redirects/post/$i" &
done

wait
echo "Populated KV in production"