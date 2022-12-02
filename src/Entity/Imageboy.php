<?php

namespace App\Entity;

use App\Repository\ImageboyRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ImageboyRepository::class)]
class Imageboy
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $prompt = null;

    #[ORM\Column]
    private ?int $userid = null;

    #[ORM\ManyToOne(inversedBy: 'imageboys')]
    #[ORM\JoinColumn(nullable: false)]
    private ?userboy $images = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrompt(): ?string
    {
        return $this->prompt;
    }

    public function setPrompt(string $prompt): self
    {
        $this->prompt = $prompt;

        return $this;
    }

    public function getUserid(): ?int
    {
        return $this->userid;
    }

    public function setUserid(int $userid): self
    {
        $this->userid = $userid;

        return $this;
    }

    public function getImages(): ?userboy
    {
        return $this->images;
    }

    public function setImages(?userboy $images): self
    {
        $this->images = $images;

        return $this;
    }
}
