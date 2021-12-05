#!/bin/bash

# This takes forever to run and should be parallelized, YOU'VE BEEN WARNED!

for i in {1..1000}
do
  wrangler kv:key put --preview --binding=REDIRECTS "/redirects/$i" "/redirects/post/$i"
done

echo "Populated KV in preview"