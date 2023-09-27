

import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    components: {
        Button: {
          variants: {
            solid: {
              _hover: {
                bg: "#4d8df5",
                color: "white",
              },
            },
          },
        },
      },
})