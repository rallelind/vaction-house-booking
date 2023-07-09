import {
  Tailwind,
  Html,
  Button,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";
import Avatar from "../src/components/ui/Avatar";
import {
  ArrowSmallRightIcon,
  EnvelopeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

export default function Invite({
  preview = "Join havklitvej 60",
  houseName = "Havklitvej 60",
  recipient = "example@example.com",
  houseInviteLink = "",
  user = { name: "ralle", email: "rasmus1234555@hotmail.dk", picture: "" },
}) {
  const { name, email, picture } = user;

  return (
    <Html>
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-gray-300 mx-auto rounded-lg p-4 mt-6">
            <Heading className="text-center font-normal text-3xl">
              Du er inviteret til at være en del af{" "}
              <strong className="text-orange-300">{houseName}</strong>
            </Heading>
            <Text>
              Hejsa <strong>{recipient}</strong>
            </Text>
            <Text>
              Du er inviteret af <strong>{name}</strong> (
              <Link
                href={`mailto:${email}`}
                className="text-orange-300 font-semibold no-underline"
              >
                {email}
              </Link>
              ) til at blive medlem af huset Havklitvej 60.
            </Text>
            <div className="flex items-center justify-center">
              <Avatar />
              <ArrowSmallRightIcon className="h-6 mr-4 ml-4" />
              <div className="bg-orange-200 rounded-lg h-10 w-10 flex items-center justify-center">
                <HomeIcon className="h-6" />
              </div>
            </div>
            <div className="mt-10 text-center">
              <Button
                className="bg-orange-100 p-2 rounded-lg border-solid border-[1px] border-orange-200 text-black"
                href={houseInviteLink}
              >
                <div className="flex items-center h-6">
                  <EnvelopeIcon className="h-6 mr-2" />
                  <p>Bliv del af {houseName}</p>
                </div>
              </Button>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
