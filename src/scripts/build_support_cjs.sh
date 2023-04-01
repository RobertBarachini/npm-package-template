#!/bin/sh

# Adopted from https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html

# NOTE: Run from workspace root

# SUBPATH_ALIAS_IMPORTS=$(cat <<EOF
# "imports": {
# 			"#utils/*": "./src/utils/*"
# 		}
# EOF
# )

# cat >dist/lib/cjs/package.json <<!EOF
# {
#     "type": "commonjs",
# 		$SUBPATH_ALIAS_IMPORTS
# }
# !EOF

# cat >dist/lib/mjs/package.json <<!EOF
# {
#     "type": "module",
# 		$SUBPATH_ALIAS_IMPORTS
# }
# !EOF

# NOTE: Aliases are no longer needed because tsc-alias script
#       transforms the imports to relative paths at build time.
#       The code to handle the legacy solution is kept here in case
#       we need to revert to it in the future.

cat >dist/lib/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF
