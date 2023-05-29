import { createStyles, Container, Group, ActionIcon, rem } from "@mantine/core";
import { BrandGithub, BrandLinkedin, BrandTwitter } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `${rem(1)} solid ${theme.colors.gray[3]}`,
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    background: "rgba( 255, 255, 255, 0.1 )",
    backdropFilter: "blur(5px)",
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const Footer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <h1>ChunkStream</h1>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <BrandGithub size="1.05rem" />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandLinkedin size="1.05rem" />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandTwitter size="1.05rem" />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default Footer;
